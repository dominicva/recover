export default function Questionnaire({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Questionnaire</h1>
      <p>{params.id}</p>
    </div>
  );
}
