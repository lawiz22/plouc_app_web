import React from 'react';
import { Form, Message, Radio } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";

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
     
    />);

export const renderRadioactive = field  => (
    
    <Radio toggle
      {...field.input}
      label={field.label}
      name={field.name}
      placeholder={field.placeholder}
      />
        
  );

  export const renderRadio = field => (
    <Form.Radio
      checked={field.input.value === field.radioValue}
      label={field.label}
      name={field.input.name}
      onChange={(e, { checked }) => field.input.onChange(field.radioValue)}
    />
  );
  

  
 

  