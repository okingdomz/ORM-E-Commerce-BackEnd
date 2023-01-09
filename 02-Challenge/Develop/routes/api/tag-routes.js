const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // try function passes asynchrinus functions, and invoked in route handling and passes thme to express for processing
  try{
    const tagData = await Tag.findAll({
      include: 
      [{model: Product, through: ProductTag}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // change find all to find by pk
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: 
        [{model: Product, through: ProductTag}]
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'no category is found with the provided id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // change find all to find by pk
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 404 page not found
// 200 went through successfully
// 500 internal server error

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'no category found with this id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// same function as above, but the route is to delete the information in the body in an asychronus way
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'no category found with this id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
