
import Packer from './packers.js';
const packer = new Packer();
class CalculatorController {

  async optimizeLoad(req, res){
    try{
      const result = await packer.optimizePacking(req.body);
        res.status(200).json(result);
    }catch (err) {
      console.error("Error in controller", err);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
  }

  
}

export default CalculatorController;
