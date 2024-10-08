// import React from 'react';
// import Link from "next/link";

// const dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <img src="/image/logofix.png" alt="Etamtest logo" className="logo" />
//         </div>
//         <div className="profile-section">
//           <img src="/image/adminpic.jpeg" alt="Profile" className="profile-pic" />
//           <h3 className="username">Wony</h3>
//           <p className="role">Administrator</p>
//         </div>
//         <nav className="menu">
//           <ul>
//             <li className="menu-item">Dashboard</li>
//             <li className="menu-item">Kelola Author</li>
//             <li className="menu-item">Kelola Tes</li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         <header className="navbar">
//           <h1 className="navbar-title">Home</h1>
//           <div className="navbar-menu">
//             <button className="navbar-toggle">&#9776;</button>
//           </div>
//         </header>

//         <div className="content">
//           <div className="card-container">
//             <div className="card">
//               <img src="/image/kelola-author-icon.png" alt="Kelola Author" />
//               <h2>Kelola Author</h2>
//             </div>
//             <div className="card">
//               <img src="/image/kelola-tes-icon.png" alt="Kelola Tes" />
//               <h2>Kelola Tes</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default dashboard;

import React from 'react';
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/image/logofix.png" alt="Etamtest logo" className="logo" />
        </div>
        <div className="profile-section">
          <img src="/image/adminpic.jpeg" alt="Profile" className="profile-pic" />
          <h3 className="username">Wony</h3>
          <p className="role">Administrator</p>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item">Dashboard</li>
            {/* Add Link to Kelola Author page */}
            <li className="menu-item">
              <Link href="/kelolaauthor">Kelola Author</Link>
            </li>
            <li className="menu-item">Kelola Tes</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="navbar">
          <h1 className="navbar-title">Home</h1>
          <div className="navbar-menu">
            <button className="navbar-toggle">&#9776;</button>
          </div>
        </header>

        <div className="content">
          <div className="card-container">
            <div className="card">
              <img src="/image/kelola-author-icon.png" alt="Kelola Author" />
              <h2>Kelola Author</h2>
            </div>
            <div className="card">
              <img src="/image/kelola-tes-icon.png" alt="Kelola Tes" />
              <h2>Kelola Tes</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

