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

/**
 * Returns a Dropdown menu with options to edit a Profile.
 * This component has been created with the Moments walkthrough.
 */
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fas fa-edit" /> Edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className="far fa-id-card" />
                    Change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className="fas fa-key" />
                    Change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}