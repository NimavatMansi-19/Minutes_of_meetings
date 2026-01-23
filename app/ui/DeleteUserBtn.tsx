"use client";
export default function DeleteUserBtn(props: any) {
  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteFn(props.id);
        }}
      >
        Delete
      </button>
    </>
  );
}