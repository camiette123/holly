import React, { useState } from 'react';

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ici tu peux envoyer les données vers ton backend ou par mail
    alert('Message envoyé avec succès !');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto" style={{marginTop:"100px"}}>
      <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          name="name"
          placeholder="Votre nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded"
          type="email"
          name="email"
          placeholder="Votre email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 rounded"
          name="message"
          placeholder="Votre message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-blue-700">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contacts;
