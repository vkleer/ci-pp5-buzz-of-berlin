import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import styles from '../styles/DotsDropdown.module.css';

import { Dropdown } from 'react-bootstrap';

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
        <Dropdown className="ml-2" drop="left">
            <Dropdown.Toggle as={ThreeDots} />
        
            <Dropdown.Menu 
                className="text-left py-0"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item 
                    className={styles.DropdownItem}
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

/**
 * Returns a Dropdown menu with options to edit a Profile.
 * This component has been created with the Moments walkthrough.
 */
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-2 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu className="text-left py-0">
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i class="fa-solid fa-fw fa-pen-to-square"></i>
                    <span className="pl-1">Edit profile</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i class="fa-solid fa-fw fa-id-card"></i>
                    <span className="pl-1">Change username</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i class="fa-solid fa-fw fa-ellipsis"></i>
                    <span className="pl-1">Change password</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}