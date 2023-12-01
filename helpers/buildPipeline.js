
// Import necessary dependencies
import { filter } from "lodash";

export function buildPipeline(filters, search, sort) {
  const pipeline = [];

  // Add filtering and searching logic if needed

  if (sort) {
    let sortObj = {};

    switch (sort) {
      case "newest":
        sortObj = { published: -1 };
        break;
      case "cook-asc":
        sortObj = { cook: 1 };
        break;
      case "cook-desc":
        sortObj = { cook: -1 };
        break;
      case "prep-asc":
        sortObj = { prep: 1 };
        break;
      case "prep-desc":
        sortObj = { prep: -1 };
        break;
      case "steps-asc":
        sortObj = { "instructions.length": 1 };
        break;
      case "steps-desc":
        sortObj = { "instructions.length": -1 };
        break;
      
    }

    if (Object.keys(sortObj).length > 0) {
      pipeline.push({
        $sort: sortObj,
      });
    }
  } else {
   
    pipeline.push({
      $sort: {
        published: -1, 
      },
    });
  }

  return pipeline;
}
