//@helpers/buildPipeline.js
import { filter } from "lodash";

export function buildPipeline(filters, sort) {
  const pipeline = [];

  // Add filtering and searching logic if needed

  if (filters) {
    const {
      tags, ingredients, categories, instructions,
    } = filters;

    const filterObj = {};

    // Filter by Tags
    if (tags && tags.length > 0) {
      filterObj.tags = { $all: tags };
    }

    // Filter by Ingredients
    if (ingredients && ingredients.length > 0) {
      const ingredientQueries = ingredients.map((ingredient) => ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
      filterObj.$and = ingredientQueries;
    }

    // Filter by Categories
    if (categories && categories.length > 0) {
      filterObj.category = { $all: categories };
    }

    // Filter by Instructions
    if (instructions) {
      filterObj.instructions = { $size: instructions };
    }

    if (Object.keys(filterObj).length > 0) {
      pipeline.push({
        $match: filterObj,
      });
    }
  }

  
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
      
      default:
        // Default sorting if no specific sorting option is provided
        sortObj = { published: -1 };
        break;
    }

    if (Object.keys(sortObj).length > 0) {
      pipeline.push({
        $sort: sortObj,
      });
    }
  } else {
    // Default sorting if no specific sorting option is provided
    pipeline.push({
      $sort: {
        published: -1,
      },
    });
  }

  return pipeline;
}



