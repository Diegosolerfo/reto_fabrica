function DepartmentForm({ form, setForm, onSubmit, isEdit }) {
  return (
    <form onSubmit={onSubmit} className="card p-4">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          required
          minLength={2}
          maxLength={40}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input
          type="text"
          className="form-control"
          required
          minLength={5}
          maxLength={100}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <button className="btn btn-primary">
        {isEdit ? "Actualizar" : "Registrar"}
      </button>
    </form>
  );
}

export default DepartmentForm;
