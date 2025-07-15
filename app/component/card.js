export default function Card() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 text-center mb-4"></div>
            <div className="col-md-12 text-center mb-4">
                <h2 style={{ color: '#ffff' }}>Anime</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card">
                <img src="/aka.jpg" className="card-img-top img-responsive" alt="..." />
                <div className="card-body">
                    <p className="card-text">Akira</p>
                </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="/fu.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Fullmetal Alchemist Brotherhood</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="/fe.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">Frieren Beyond Journey's End</p>
                </div>
                </div>
            </div>
      </div>
    </div>
    );
  }