// packers.js
import CONTAINERS from "../data/ContainerData.js";

class Packer {
  // Returns CBM of 1 item (in cubic meters)
  calculateCBM(length, width, height) {
    const cbm = (length / 100) * (width / 100) * (height / 100);
    return cbm;
  }

  // Main packing optimizer
 async optimizePacking(item) {
  try {
    const itemCBM = this.calculateCBM(item.length, item.width, item.height);
    const totalCBM = itemCBM * item.quantity;
    const totalWeight = item.weight * item.quantity;

    const sortedContainersDesc = [...CONTAINERS].sort((a, b) => b.volume - a.volume);

    let suggestedContainer = CONTAINERS.find(
      (c) => totalCBM <= c.volume && totalWeight <= c.maxWeight
    );

    if (!suggestedContainer) {
      const largestContainer = sortedContainersDesc[0];
      if (totalWeight <= largestContainer.maxWeight) {
        suggestedContainer = largestContainer;
      }
    }

    return {
      totalCBM: totalCBM.toFixed(3),
      totalWeight,
      itemsFit: item.quantity,
      suggestContainer: suggestedContainer
        ? suggestedContainer.type
        : "Requires multiple containers",
      stacking: suggestedContainer
        ? suggestedContainer.stackable
          ? "Allowed"
          : "Not Allowed"
        : "Unknown",
      weightLimit: suggestedContainer
        ? `${suggestedContainer.maxWeight} kg`
        : "Unknown",
    };
  } catch (err) {
    console.error("error", err);
    return {
      totalCBM: "Error",
      totalWeight: "Error",
      itemsFit: 0,
      suggestContainer: "Error",
      stacking: "Error",
      weightLimit: "Error",
    };
  }
}

}

export default Packer;
