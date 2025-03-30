import * as clientService from "../services/clientservice.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.createClient(clientData);
    res.status(201).json({ success: true, data: newClient });
  } catch (error) {
    console.error("Error creating client", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body;
    const updatedClient = await clientService.updateClient(
      clientData,
      clientId
    );
    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ success: true, data: updatedClient });
  } catch (error) {
    console.error("Error updating client", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await clientService.deleteClient(clientId);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Client deleted Successfully" });
  } catch (error) {
    console.error("Error deleting client", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClient = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const clients = await clientService.searchClient(searchTerm);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
