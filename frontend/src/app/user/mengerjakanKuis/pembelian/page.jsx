// pages/index.js

'use client'
import React from "react";

export default function Home() {
  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="container">
        <header className="header">
          <div className="header-left">
            <h1 className="header-title" style={{ fontSize: '25px' }} >Membeli Soal</h1>
          </div>
          <div className="header-right" style={{ display: "flex", alignItems: "center" }}>
  <a className="logo">
    <img src="/image/logo.png" alt="Logo" style={{ width: "150px", height: "auto" }} />
  </a>
  <div className="profileIcon" style={{ marginLeft: "20px", marginRight: "10px"}}>
    <img src="/image/userpic.png" alt="Profile Icon" style={{ width: "40px", height: "auto" }} />
  </div>
</div>

        </header>
      </div>

      {/* Main Card Section */}
      <div className="card-container">
      <div className="test icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <img src="/image/book.png" alt="test icon" style={{ width: "50px", height: "auto" }} />
      </div>
      <h2 className="heading">Try Out CPNS 2025 #2</h2>
        <p className="sub-heading">Prediksi kemiripan 75%</p>
        <ul className="list" style={{ listStyleType: "disc" }}>
          <li>Memiliki 1x kesempatan mengerjakan soal</li>
          <li>Mendapatkan hasil Try Out secara langsung</li>
          <li>Mengetahui jawaban salah dan benar</li>
          <li>Mendapatkan penjelasan soal dalam bentuk pdf</li>
        </ul>
        <div className="price">Rp. 30.000,00</div>
        <button className="button">Beli</button>
      </div>

      <style jsx>{`
        .page-container {
          background-color: #ffffff;
          min-height: 100vh;
        }

        .container {
            font-family: Poppins, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .header {
            background-color: #0d47a1;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            margin-bottom: 20px;
            margin-top: 10px; 
          }

        .header-title {
          font-size: 25px;
          font-weight: bold;
          color: #ffffff;
        }

        .breadcrumb {
          margin-top: 10px;
          color: #666;
        }

        .breadcrumb-link {
          color: #0066cc;
          text-decoration: none;
          margin-right: 5px;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .card-container {
          background-color: #f3f3f3;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          text-align: center;
          position: relative;
          margin: 0 auto;
          margin-top: 50px;
          font-family: Arial, sans-serif;
        }
        .test icon {
          display: flex;
          align-items: center;
        }
        .shape {
          background-color: #e0e0e0;
          border-radius: 8px;
          padding: 20px 10px;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          margin-top: 50px;
        }

        .heading {
          font-size: 20px;
          font-weight: bold;
          color: #0B61AA;
          margin: 10px;
        }

        .sub-heading {
          margin: 0 auto;
          font-size: 14px;
          color: #0B61AA;
        }

        .list {
          text-align: left;
          margin: 20px 0;
          list-style-type: none;
          padding-left: 0;
          color: #333;
        }

        .price {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
          margin-left: 190px;
          color: #333;
        }

        .button {
          padding: 10px 20px;
          background-color: #CFE8FF;
          color: #000;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          outline: 1px solid #000; 
          margin-left: 270px;
}
        }
      `}</style>
    </div>
  );
}
