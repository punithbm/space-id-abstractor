export default function Button(props) {
  return (
    <button
      type="button"
      className="rounded bg-[#00cbc6] px-2 py-1 text-xs font-semibold text-[#1e1f2d] shadow-sm hover:bg-[#00a5a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00cbc6]"
      {...props}
    >
      {props.children}
    </button>
  );
}
