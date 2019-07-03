import React from 'react';
import { Form, Message } from "semantic-ui-react";

export const renderInput = ({input, label, type, meta: {touched, error}, disabled}) => (
    <div className="form-group">
        <label>{label}:</label>
        <input {...input} type={type} onBlur={() => {}}/>
        
    </div>
);

export const renderTextArea = ({input, label, type, meta: {touched, error}}) => (
    <div className="form-group">
        <label>{label}:</label>
        <textarea {...input} className="form-control" onBlur={() => {}}/>
        {touched && error && <span className="text-danger">{error}</span>}
    </div>
);


export const renderTextAreaOK = field  => (
    <Form.TextArea
      {...field.input}
      label={field.label}
      placeholder={field.placeholder}
     
    />
  );