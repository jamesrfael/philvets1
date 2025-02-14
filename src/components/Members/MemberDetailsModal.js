import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MemberDetailsModal = ({ show, handleClose, member, onSave, onDelete }) => {
  const [editableMember, setEditableMember] = useState(member);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editableMember);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Member Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h5>Basic Information</h5>
          <Form.Group>
            <Form.Label>ID Number:</Form.Label>
            <Form.Control name="id" value={editableMember.id} onChange={handleChange} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control name="lastName" value={editableMember.lastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control name="firstName" value={editableMember.firstName} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Middle Name:</Form.Label>
            <Form.Control name="middleName" value={editableMember.middleName} onChange={handleChange} />
          </Form.Group>
          
          <h5>Contact Information</h5>
          <Form.Group>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control name="email" value={editableMember.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Number:</Form.Label>
            <Form.Control name="contactNumber" value={editableMember.contactNumber} onChange={handleChange} />
          </Form.Group>
          
          <h5>Employment Information</h5>
          <Form.Group>
            <Form.Label>Date Hired:</Form.Label>
            <Form.Control type="date" name="dateHired" value={editableMember.dateHired} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company:</Form.Label>
            <Form.Control name="company" value={editableMember.company} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department:</Form.Label>
            <Form.Control name="department" value={editableMember.department} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Position:</Form.Label>
            <Form.Control name="position" value={editableMember.position} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control name="status" value={editableMember.status} onChange={handleChange} />
          </Form.Group>
          
          <h5>Monthly Salary</h5>
          <Form.Group>
            <Form.Label>Salary:</Form.Label>
            <Form.Control type="number" name="salary" value={editableMember.salary} onChange={handleChange} />
          </Form.Group>
          
          <h5>Contributions</h5>
          <Form.Group>
            <Form.Label>SSS:</Form.Label>
            <Form.Control name="sss" value={editableMember.sss} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>PhilHealth:</Form.Label>
            <Form.Control name="philHealth" value={editableMember.philHealth} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>HDMF/Pag-IBIG:</Form.Label>
            <Form.Control name="hdmf" value={editableMember.hdmf} onChange={handleChange} />
          </Form.Group>
          
          <h5>Leaves</h5>
          <Form.Group>
            <Form.Label>Vacation Leave:</Form.Label>
            <Form.Control type="number" name="vacationLeave" value={editableMember.vacationLeave} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sick Leave:</Form.Label>
            <Form.Control type="number" name="sickLeave" value={editableMember.sickLeave} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Leave:</Form.Label>
            <Form.Control type="number" name="emergencyLeave" value={editableMember.emergencyLeave} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Maternity Leave:</Form.Label>
            <Form.Control type="number" name="maternityLeave" value={editableMember.maternityLeave} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Paternity Leave:</Form.Label>
            <Form.Control type="number" name="paternityLeave" value={editableMember.paternityLeave} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(editableMember.id)}>Delete</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberDetailsModal;
