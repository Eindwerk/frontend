"use client";

import Text from "../ui/Text";
import Input from "../ui/input";

export function EditableName({
  isEditing,
  newName,
  setNewName,
}: {
  isEditing: boolean;
  newName: string;
  setNewName: (val: string) => void;
}) {
  return isEditing ? (
    <div className="editable-name">
      <Input
        label="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    </div>
  ) : (
    <Text variant="bold-blue-17">{newName}</Text>
  );
}
