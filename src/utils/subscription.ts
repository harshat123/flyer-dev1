export const checkPremiumRequired = (user: any): boolean => {
  const joinedDate = new Date(user.joinedDate);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  // If user joined more than 6 months ago and is not premium
  if (joinedDate < sixMonthsAgo && !user.isPremium) {
    return true;
  }
  
  // If user is premium but subscription expired
  if (user.isPremium && user.premiumExpiryDate) {
    const expiryDate = new Date(user.premiumExpiryDate);
    if (expiryDate < new Date()) {
      return true;
    }
  }
  
  return false;
};

export const checkBusinessNameAvailable = (
  businessName: string,
  businessRegistry: any[],
  currentUserId?: string
): boolean => {
  const existingBusiness = businessRegistry.find(
    (business) => business.businessName.toLowerCase() === businessName.toLowerCase()
  );
  
  // If no existing business found, it's available
  if (!existingBusiness) {
    return true;
  }
  
  // If current user owns this business name, it's available for them
  if (currentUserId && existingBusiness.userId === currentUserId) {
    return true;
  }
  
  return false;
};

export const getSubscriptionPrice = (type: 'monthly' | 'yearly'): number => {
  return type === 'monthly' ? 9.99 : 99.99;
};