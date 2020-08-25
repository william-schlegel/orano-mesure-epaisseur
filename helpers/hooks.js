import { useReducer, useRef, useEffect } from "react";
import { firestore } from "./firebase";
/**
 * Retourne une query pour utiliser avec le hook useFirestoreQuery
 * @param {String} collection nom de la collection
 * @param {String} uid optionel : id du document
 * @param {String} filtre optionel : filtre sur la collection (pas d'id dans ce cas)
 * @returns {Object} firestore query
 */
export const firestoreQuery = (collection, uid, filtre) => {
  const col = firestore.collection(collection);
  if (uid) return col.doc(uid);
  if (filtre) return col.where(...filtre);
  return col;
};

// Reducer for hook state and actions
const reducer = (state, action) => {
  switch (action.type) {
    case "idle":
      return { status: "idle", data: undefined, error: undefined };
    case "loading":
      return { status: "loading", data: undefined, error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

/**
 * hook pour gérer les appels firestore
 * @param {Object} query firestore query créée avec la fonction firestoreQuery()
 * @returns {Object} { data: { id, data }, status: idle|loading|success|error, error }
 */
export function useFirestoreQuery(query) {
  // Our initial state
  // Start with an "idle" status if query is falsy, as that means hook consumer is
  // waiting on required data before creating the query object.
  // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
  const initialState = {
    status: query ? "loading" : "idle",
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare(query, (prevQuery) => {
    // Use built-in Firestore isEqual method to determine if "equal"
    return prevQuery && query && query.isEqual(prevQuery);
  });

  useEffect(() => {
    // Return early if query is falsy and reset to "idle" status in case
    // we're coming from "success" or "error" status due to query change.
    if (!queryCached) {
      dispatch({ type: "idle" });
      return;
    }

    dispatch({ type: "loading" });

    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    return queryCached.onSnapshot(
      (response) => {
        // Get data for collection or doc
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response);

        dispatch({ type: "success", payload: data });
      },
      (error) => {
        dispatch({ type: "error", payload: error });
      }
    );
  }, [queryCached]); // Only run effect if queryCached changes

  return state;
}

// Get doc data and merge doc.id
function getDocData(doc) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

// Get array of doc data from collection
function getCollectionData(collection) {
  return collection.docs.map(getDocData);
}

/**
 * This hook is similar to useMemo, but instead of passing an array of dependencies
 * we pass a custom compare function that receives the previous and new value.
 * The compare function can then compare nested properties, call object methods,
 * or anything else to determine equality. If the compare function returns true then
 * the hook returns the old object reference.
 * @param {Any} next nouvelle valeur
 * @param {function} compare foncton de comparaison
 */
export function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;

  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);

  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}
