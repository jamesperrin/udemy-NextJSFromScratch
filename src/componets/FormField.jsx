export default function FormField({ label, id, type = 'text', required, options = [], children, ...props }) {
  const renderAsterisk = () =>
    required ? (
      <abbr title="required" className="text-red-500 ml-1">
        *
      </abbr>
    ) : null;

  // 🔹 Radio group (fieldset + legend)
  if (type === 'radio-group') {
    return (
      <fieldset className="mb-4">
        <legend className="block text-gray-700 mb-1">
          {label} {renderAsterisk()}
        </legend>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt.value} className="inline-flex items-center">
              <input type="radio" name={id} value={opt.value} required={required} className="mr-2" {...props} />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  // 🔹 Checkbox group (fieldset + legend)
  if (type === 'checkbox-group') {
    return (
      <fieldset className="mb-4">
        <legend className="block text-gray-700 mb-1">
          {label} {renderAsterisk()}
        </legend>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt.value} className="inline-flex items-center">
              <input
                type="checkbox"
                name={id}
                value={opt.value}
                required={required && options.indexOf(opt) === 0}
                className="mr-2"
                {...props}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  // 🔹 Select
  if (type === 'select') {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 mb-1">
          {label} {renderAsterisk()}
        </label>
        <select
          id={id}
          required={required}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // 🔹 Textarea
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 mb-1">
          {label} {renderAsterisk()}
        </label>
        <textarea
          id={id}
          required={required}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          {...props}
        />
      </div>
    );
  }

  // 🔹 Default: input
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label} {renderAsterisk()}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        {...props}
      />
    </div>
  );
}
