import React, { useEffect, useState } from 'react';

type ProductoAPI = {
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: string;
  url_imagen: string;
};

const SHEET_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SPREADSHEET_ID}/values/${process.env.REACT_APP_GOOGLE_SHEET_NAME}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

export const fetchProducts = async (): Promise<ProductoAPI[]> => {
  const response = await fetch(SHEET_API_URL);
  const data = await response.json();

  const rows = data.values.slice(1); // Skip the header row
  return rows.map((row: string[]) => ({
    categoria: row[0],
    nombre: row[1],
    descripcion: row[2],
    precio: row[3],
    url_imagen: row[4],
  }));
};
