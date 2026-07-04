const Footer = () => {
    return (
      <footer className="bg-white text-gray-700 py-6 text-sm">
        <div className="w-full">
          <div className="border-t border-gray-300 pt-4">
            <div className="flex flex-col space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800">Store</h4>
                <ul className="mt-2 space-y-1">
                  <li>Gift card</li>
                  <li>Redeem</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Children and families</h4>
                <ul className="mt-2 space-y-1">
                  <li>Guidelines for parents</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-xs flex flex-col space-y-2">
            <a href="#">Conditions of Carriage</a>
            <a href="#">Confidentiality
</a>
            <a href="#">developer</a>
            <span>All prices include VAT.</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;