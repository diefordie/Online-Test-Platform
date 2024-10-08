import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Detail Soal - Etamtest</title>
      </Head>
      <div className="container">
        <header className="header">
          <div className="header-left">
          <h1 className="header-title" style={{ fontSize: '25px' }}>Detail Soal</h1>
            <div className="breadcrumb">
              <a href="#">Home</a> / <a href="#">Latihan Tes UTBK</a> / <a href="#">Detail Soal</a>
            </div>
          </div>
          <div className="header-right">
  <a className="logo">
    <img src="/image/logo.png" alt="Logo" className="h-auto mb-4" style={{ width: '150px', height: 'auto' }}/>
  </a>
  <div className="profileIcon">
  <img src="/image/userpic.png" alt="Profile Icon" className="h-auto mb-4" style={{ width: '40px', height: 'auto', marginRight: "10px"}}/>
  </div>
</div>
        </header>

        <main className="main">
          <section className="content">
            <h2>Detail Soal</h2>
            <h3>TRY OUT UTBK 2025 #1</h3>
            </section>
            </main>

            <div className="card">
              <div className="testItem">
                <p style={{ color: 'gray' }}>Tes Potensi Skolastik</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'gray' }}>
                <img src="/image/clock.png" alt="Clock Icon" style={{ width: '20px', height: '20px' }} /> 
                <span>90 menit</span>
                |
                <img src="/image/paper.png" alt="Paper Icon" style={{ width: '20px', height: '20px' }} />
                <span>90 soal</span>
              </span>
              </div>
              <hr className="divider" />
              <div className="testItem">
                <p style={{ color: 'gray' }}>Tes Literasi Bahasa</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'gray' }}>
                <img src="/image/clock.png" alt="Clock Icon" style={{ width: '20px', height: '20px' }} /> 
                <span>47 menit</span>
                |
                <img src="/image/paper.png" alt="Paper Icon" style={{ width: '20px', height: '20px' }} />
                <span>45 soal</span>
              </span>
              </div>
              <hr className="divider" />
              <div className="testItem">
                <p style={{ color: 'gray' }}>Tes Penalaran Matematika</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'gray' }}>
                <img src="/image/clock.png" alt="Clock Icon" style={{ width: '20px', height: '20px' }} /> 
                <span>37 menit</span>
                |
                <img src="/image/paper.png" alt="Paper Icon" style={{ width: '20px', height: '20px' }} />
                <span>20 soal</span>
              </span>
              </div>
              <button className="startButton" onClick={() => alert('Are You Sure?')}>Mulai Try Out Sekarang</button>
            </div>
          

        <style jsx>{`
          .container {
            font-family: Poppins, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .header {
            background-color: #0d47a1;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
          }

          .breadcrumb {
            font-size: 14px;
            color: white;
          }

          .breadcrumb a {
            color: white;
            text-decoration: none;
            margin-right: 5px;
          }

          .header-right {
            display: flex;
            align-items: center;
          }

          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-right: 20px;
          }

          .profileIcon {
            font-size: 24px;
          }

          .main {
            background-color: #f0f0f0;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin-top: 20px; 
          }

          .content h2 {
            color: #0d47a1;
            font-size: 28px;
            margin-bottom: 5px;
          }

          .content h3 {
            color: #666;
            font-size: 18px;
            margin-bottom: 20px;
          }

          .card {
            background-color: #f0f0f0;
            border-radius: 10px;
            padding: 20px;
            text-align: left;
            margin-top: 20px; 
          }
          .p {
            color: #666; 
          }

          .testItem {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background-color: none;
            border-radius: 8px;
            margin-bottom: 15px;
          }

          .startButton {
            display: block;
            width: 100%;
            padding: 12px;
            background-color: #0d47a1;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
            margin-top: 20px;
          }

          .startButton:hover {
            background-color: #0b3d91;
          }

          /* Responsif untuk tablet dan smartphone */
          @media (max-width: 768px) {
            .header {
              padding: 15px;
            }

            .breadcrumb {
              font-size: 12px;
            }

            .logo {
              font-size: 20px;
            }

            .content h2 {
              font-size: 24px;
            }

            .content h3 {
              font-size: 16px;
            }

            .testItem {
              flex-direction: column;
              align-items: flex-start;
              padding: 10px;
            }

            .testItem p {
              margin-bottom: 5px;
            }

            .startButton {
              padding: 10px;
              font-size: 14px;
            }
          }

          /* Responsif untuk smartphone (layar sangat kecil) */
          @media (max-width: 480px) {
            .header {
              padding: 10px;
            }

            .logo {
              font-size: 18px;
            }

            .profileIcon {
              font-size: 20px;
            }

            .breadcrumb {
              font-size: 10px;
            }

            .content h2 {
              font-size: 22px;
            }

            .content h3 {
              font-size: 14px;
            }

            .testItem {
              padding: 8px;
            }

            .startButton {
              padding: 8px;
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
