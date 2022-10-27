import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/DotsDropdown.module.css';

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
    className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
));

/**
 * Returns a Dropdown menu with options to edit or delete a Post.
 * This component has been created with the Moments walkthrough.
 */
export const DotsDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />
        
            <Dropdown.Menu 
                className="text-left py-0"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="Edit"
                >
                    <i className="fa-solid fa-fw fa-pencil"></i>
                    <span className="pl-1">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="Delete"
                >
                    <i className="fas fa-fw fa-trash-alt text-danger" />
                    <span className="text-danger pl-1">Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};