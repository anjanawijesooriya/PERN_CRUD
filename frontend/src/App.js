import "./App.css";
import { useState } from "react";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/NavBar";
import Tablelist from "./components/Tablelist";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:8070/api/clients/add",
          newClientData
        );
        console.log(response.data);
      } catch (error) {}
      console.log("modal is add");
    } else {
      console.log("modal is edit");
      try {
        const response = await axios.put(
          `http://localhost:8070/api/clients/edit/${clientData.id}`,
          newClientData
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating client", error);
      }
    }
  };
  return (
    <div>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <Tablelist handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
      />
    </div>
  );
}

export default App;
