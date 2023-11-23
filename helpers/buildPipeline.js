// buildpipeline.js

export function buildPipeline(filters, search, sort) {
    const pipeline = [];
  
    // Add $addFields stage to calculate numofInstructions
    pipeline.push({
      $addFields: {
        numofInstructions: {
          $size: '$instructions'
        },
      }
    });
  
    // Add $match stage to filter based on numofInstructions
    const matchStage = {
      $match: {
        $and: [
          { numofInstructions: { $gte: 1 } },
          { numofInstructions: { $lte: 72 } }
        ]
      }
    };
  
    // Add additional filters if provided
    if (filters) {
        if (filters.category) {
            pipeline.push({
              $match: { category: filters.category }
            });
    }
  
    // Add search stage if search query is provided
    if (search) {
        pipeline.push({
            $match: { $text: { $search: search } }
          });
        }
    }
  
    pipeline.push(matchStage);
  
    // Add $sort stage to sort the data
    if (sort) {
      pipeline.push({
        $sort: sort
      });
    } else {
      // Default sort if not provided
      pipeline.push({
        $sort: {
          numofInstructions: 1,
          numofInstruction: -1,
          cook: -1,
          prep: -1,
          published: 1,
          published: -1,
        }
      });
    }
  
    return pipeline;
  }
  