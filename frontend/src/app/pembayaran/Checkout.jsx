'use client';  // Tambahkan ini untuk menandai komponen sebagai Client Component

import { useState } from 'react';

const CheckoutPage = () => {
  // Contoh data order, sesuaikan dengan kebutuhan Anda
  const [order] = useState({
    id: 'order123',
    title: 'Product A',
    price: 100000,
  });

  // Fungsi makePayment untuk memproses pembayaran
  const makePayment = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      console.log('Transaction Token:', data.token);

      // Gunakan token transaksi untuk redirect ke halaman pembayaran Midtrans
      window.snap.pay(data.token);
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
          onClick={makePayment}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default CheckoutPage;
