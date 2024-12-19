"use client";
import { useState } from "react";

export default function EditableText({ initialText, onSave }) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onSave(text); // Отправляем текст родителю
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setText(e.currentTarget.textContent)}
            style={{
              border: "1px solid gray",
              padding: "8px",
              minHeight: "20px",
            }}
          >
            {text}
          </div>
          <button onClick={handleSave} style={{ marginTop: "10px" }}>
            Сохранить
          </button>
        </div>
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>{text}</div>
      )}
    </div>
  );
}
