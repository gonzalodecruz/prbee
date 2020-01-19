module.exports = {
  basicPrice: 36000,
  optionAdditionalFee: 10000,
  snsOptions: [
    {
      name: 'instagram',
      post: [
        { monthlyLimit: 8, weeklyLimit: 2 },
        { monthlyLimit: 16, weeklyLimit: 4 },
        { monthlyLimit: 32, weeklyLimit: 8 },
      ],
      meeting: [
        { monthlyLimit: 1, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 2, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 3, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
      ],
      report: { monthlyLimit: 1 },
      fee: 0,
      selected: false,
    },
    {
      name: 'facebook',
      post: [
        { monthlyLimit: 4, weeklyLimit: 1 },
        { monthlyLimit: 8, weeklyLimit: 2 },
        { monthlyLimit: 16, weeklyLimit: 4 },
      ],
      meeting: [
        { monthlyLimit: 1, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 2, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 3, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
      ],
      report: { monthlyLimit: 1 },
      fee: 0,
      selected: false,
    },
    {
      name: 'twitter',
      post: [
        { monthlyLimit: 20, weeklyLimit: 5 },
        { monthlyLimit: 40, weeklyLimit: 10 },
        { monthlyLimit: 80, weeklyLimit: 20 },
      ],
      meeting: [
        { monthlyLimit: 1, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 2, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
        { monthlyLimit: 3, amenities: [{ text: '訪問' }, { text: 'TV会議' }] },
      ],
      report: { monthlyLimit: 1 },
      fee: 0,
      selected: false,
    },
  ],
  postLvOptions: [
    {
      name: 'Lv 1',
      type: 'post',
      fee: 0,
      selected: true,
    },
    {
      name: 'Lv 2',
      type: 'post',
      fee: 12000,
      selected: false,
    },
    {
      name: 'Lv 3',
      type: 'post',
      fee: 24000,
      selected: false,
    },
  ],
  meetingLvOptions: [
    {
      name: 'Lv 1',
      type: 'meeting',
      fee: 0,
      selected: true,
    },
    {
      name: 'Lv 2',
      type: 'meeting',
      fee: 12000,
      selected: false,
    },
    {
      name: 'Lv 3',
      type: 'meeting',
      fee: 24000,
      selected: false,
    },
  ],
};
