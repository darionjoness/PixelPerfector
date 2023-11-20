import asyncHandler from 'express-async-handler'

// @desc    Purchase points
// @route   POST /api/transactions/purchasePoints
// @access  Private
const purchasePoints = asyncHandler(async (req, res) => {
    res.json({ message: 'Purchase Points' })
})

// @desc    Use Points
// @route   PUT /api/transactions/usePoints
// @access  Private
const usePoints = asyncHandler(async (req, res) => {
    res.json({ message: 'Use Point' })
})


export {
    purchasePoints,
    usePoints
}