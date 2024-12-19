import EditableText from "./components/EditableText/EditableText";

export default function Panel() {
  return (
    <div>
      <h1>Редактируемый текст:</h1>
      <EditableText initialText="Дважды кликните для редактирования" />
    </div>
  );
}
