"use client";

import Text from "../ui/Text";
import Input from "../ui/input";

export default function EditableName({ isEditing }: { isEditing: boolean }) {
  // In real case, lift `name` state too if needed
  const name = "Cédric Van Hoorebeke";

  return isEditing ? (
    <Input label="Name" defaultValue={name} />
  ) : (
    <Text variant="bold-blue-17">{name}</Text>
  );
}
