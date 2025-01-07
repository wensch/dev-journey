const TaskOrder = ({
  handleOrderChange,
}: {
  handleOrderChange: (value: string) => void;
}) => {
  return (
    <div className="ml-auto flex justify-end -mt-12">
      <select
        name="order"
        onChange={(e) => handleOrderChange(e.target.value)}
        className="border p-2 rounded"
        defaultValue={'DEFAULT'}
      >
        <option value="DEFAULT" disabled>
          Selecione a ordenação
        </option>
        <option value="mais_recente">Mais recente</option>
        <option value="menos_recente">Menos recente</option>
        <option value="az">A - Z</option>
        <option value="za">Z - A</option>
      </select>
    </div>
  );
};

export default TaskOrder;
