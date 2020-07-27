import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useField } from "formik";

const Input = ({ label, half, name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={half ? styles.half : styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        style={styles.input}
      />
      {meta.touched && meta.error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{meta.error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  half: {
    width: "50%",
    paddingHorizontal: 5,
  },
  formControl: {
    width: "100%",
  },
  label: { marginVertical: 8, fontWeight: "bold" },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
