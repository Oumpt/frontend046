export default function Card() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 text-center mb-4"></div>
            <div className="col-md-12 text-center mb-4">
                <h3>components</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card">
                <img src="/card.png" className="card-img-top img-responsive" alt="..." />
                <div className="card-body">
                    <p className="card-text">รายละเอียด card</p>
                </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="/carousel.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">รายละเอียด carousel</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="/footer.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text">รายละเอียด footer</p>
                </div>
                </div>
            </div>
      </div>
    </div>
    );
  }