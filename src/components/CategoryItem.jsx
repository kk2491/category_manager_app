import React, { useState } from "react";
import Modal from "react-modal";
import "./CategoryItem.css";
import { getCategories, createCategory, updateCategory, getCategoryById, deleteCategory } from "../api/services";

Modal.setAppElement("#root");

export const CategoryItem = ({ name, children, id, parentId, fetchCategories }) => {
  const [showOptions, showSetOptions] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [newName, setNewName] = useState(null);

  const handleItemClick = (e) => {
    showSetOptions(!showOptions);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleAction = async (selectedAction, parentId, categoryId = null, newName = null) => {
    try {
      let actionOutput = null;

      switch (selectedAction) {
        case "create":
          actionOutput = await createCategory({ name: newName, parentId: categoryId });
          break;

        case "update":
          actionOutput = await updateCategory(categoryId, { name: newName });
          break;

        case "delete":
          actionOutput = await deleteCategory(categoryId);
          break;

        default:
          console.log("This is not possible");
          break;
      }

      setShowActionModal(false);
      fetchCategories();

      return actionOutput;
    } catch (err) {
      console.log("handleAction error : ", err);
    }
  };

  return (
    <div className="category-item-container">
      <li className="category-item-list-item" onClick={handleItemClick}>
        {name}
        {showOptions && (
          <div>
            <button
              className="category-item-action-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowActionModal(true);
                setModalHeader("Create New Category");
                setSelectedAction("create");
              }}
            >
              Create New Category
            </button>
            <button
              className="category-item-action-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowActionModal(true);
                setModalHeader("Update Category");
                setSelectedAction("update");
              }}
            >
              Update Category
            </button>
            <button
              className="category-item-action-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowActionModal(true);
                setModalHeader("Delete Category");
                setSelectedAction("delete");
              }}
            >
              Delete Category
            </button>
          </div>
        )}
        {children && Object.keys(children).length > 0 && (
          <ul>
            {Object.keys(children).map((childKey) => (
              <CategoryItem key={childKey} {...children[childKey]} fetchCategories={fetchCategories}></CategoryItem>
            ))}
          </ul>
        )}
      </li>

      <Modal
        isOpen={showActionModal}
        onRequestClose={() => setShowActionModal(false)}
        contentLabel={modalHeader}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-container">
          <h2>{modalHeader}</h2>
          {selectedAction != "delete" && <input type="text" placeholder="Category Name" onChange={(e) => setNewName(e.target.value)} />}
          {selectedAction == "delete" && (
            <p>
              Warning: Deleting this category will also permanently delete all of its child categories. This action cannot be undone. Are
              you sure you want to proceed?
            </p>
          )}

          <div className="modal-buttons-container">
            <button onClick={() => handleAction(selectedAction, parentId, id, newName)}>Confirm</button>
            <button onClick={() => setShowActionModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
