import AddRowForm from "../components/AddRowForm";
import Header from "../components/Header";

export default function Homepage() {
  return (
    <div className="min-h-screen flex justify-center  ">
      <div className="w-full pt-6  px-6 md:px-12 lg:px-32">
        <Header />
        <AddRowForm />
      </div>
    </div>
  );
}
