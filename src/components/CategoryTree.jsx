import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { CategoryItem } from "./CategoryItem";
import { getCategories } from "../api/services";
import "./CategoryTree.css";
import { createCategory } from "../api/services";

export const CategoryTree = () => {
  const [categories, setCategories] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    try {
      let categories = await getCategories();
      setCategories(categories);
    } catch (err) {
      console.log("fetchCategories error : ", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (name) => {
    try {
      let createCategoryOutput = await createCategory({ name: name, parentId: "null" });
      console.log("createCategoryOutput : ", createCategoryOutput);

      setShowCreateModal(false);
      fetchCategories();
      return;
    } catch (err) {
      console.log("handleCreateCategory error : ", err);
    }
  };

  return (
    <div className="category-container">
      <h1>Welcome to Category Management</h1>
      <h2>Categories</h2>
      <div className="button-container">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCreateModal(true);
          }}
        >
          Create new root category
        </button>
      </div>
      <ul>
        {Object.keys(categories).map((categoryKey) => (
          <CategoryItem key={categoryKey} {...categories[categoryKey]} fetchCategories={fetchCategories}></CategoryItem>
        ))}
      </ul>

      <Modal
        isOpen={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
        contentLabel="Create New Category"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-container">
          <h2>Create New Category</h2>
          <input type="text" placeholder="Category Name" onChange={(e) => setNewName(e.target.value)} />

          <div className="modal-buttons-container">
            <button onClick={() => handleCreateCategory(newName)}>Confirm</button>
            <button onClick={() => setShowCreateModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
