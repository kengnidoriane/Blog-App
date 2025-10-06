const User = require('../models/User');

// Suivre un utilisateur
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (userId === currentUserId.toString()) {
      return res.status(400).json({ message: 'Vous ne pouvez pas vous suivre vous-même' });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si déjà suivi
    const isAlreadyFollowing = currentUser.following.includes(userId);

    if (isAlreadyFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUserId.toString());
      
      await currentUser.save();
      await userToFollow.save();
      
      res.json({ following: false, message: 'Vous ne suivez plus cet utilisateur' });
    } else {
      // Follow
      currentUser.following.push(userId);
      userToFollow.followers.push(currentUserId);
      
      await currentUser.save();
      await userToFollow.save();
      
      res.json({ following: true, message: 'Vous suivez maintenant cet utilisateur' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vérifier le statut de suivi
exports.getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const currentUser = await User.findById(currentUserId);
    const isFollowing = currentUser.following.includes(userId);

    res.json({ following: isFollowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};