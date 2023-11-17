import CampaignCard from '@/components/cards/CampaignCard';

const mockedCard = {
  title: 'Charity #1',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur neque massa, sed pellentesque nisl rutrum eget. Nulla libero ante, congue at vulputate a, tempus ac lorem.',
  imgUrl:
    'https://static.vecteezy.com/system/resources/previews/006/902/005/non_2x/illustration-for-charity-welfare-assistance-concept-free-vector.jpg',
  deposited: '43200.12',
  generated: '123.54',
  participants: 7,
  createdAt: 1700222778,
  chainLogoUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
  apy: 4.5,
};

export default function Campaigns() {
  return (
    <div className='flex w-full flex-wrap justify-center gap-6'>
      <CampaignCard data={mockedCard} />
      <CampaignCard data={mockedCard} />
      <CampaignCard data={mockedCard} />
      <CampaignCard data={mockedCard} />
      <CampaignCard data={mockedCard} />
      <CampaignCard data={mockedCard} />
    </div>
  );
}
