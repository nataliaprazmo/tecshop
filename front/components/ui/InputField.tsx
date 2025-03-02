import { InputFieldProps } from "@/types";
import { CheckCircle, XCircle } from "react-feather";

const InputField:React.FC<InputFieldProps>=({
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    helperText
})=>{
    return <div className="relative w-full">
    <div className="flex items-center gap-4 w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
          touched && error
            ? 'border-red-700 focus:ring-red-200'
            : touched && !error
            ? 'border-primary focus:ring-indigo-200'
            : 'border-gray-300 focus:ring-blue-200'
        }`}
      />
      {touched && (
        <div className="absolute -right-8">
          {error ? (
            <XCircle className="h-5 w-5 text-red-700" />
          ) : (
            <CheckCircle className="h-5 w-5 text-primary" />
          )}
        </div>
      )}
    </div>
    {touched && error && (
      <p className="mt-1 text-sm text-red-700">{error}</p>
    )}
    {touched && !error && helperText && (
      <p className="mt-1 text-xs text-gray-500">{helperText}</p>
    )}
  </div>
}

export default InputField;