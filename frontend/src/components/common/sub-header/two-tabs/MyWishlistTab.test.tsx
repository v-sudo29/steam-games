import { render, screen } from "../../../../test/test-utils";
import MyWishlistTab from "./MyWishlistTab";
import { vi } from "vitest";
import { Tab, Tabs } from "@chakra-ui/react";
import { GameObject } from "../../../../interface/GameObject";

describe('MyWishlistTab component', () => {
  const mockFn = vi.fn()
  const mockBoolean = false
  const mockWishlistData: GameObject[] = [{
    appId: '',
    currentPrice: '',
    discount: '',
    genres: [''],
    historicalLow: false,
    id: '',
    imgUrl: '',
    name: '',
    originalPrice: '',
    rating: '',
    reviewsType: '',
    saleEnds: '',
    url: '',
  }]

  test('renders', () => {
    render(
      <Tabs>
        <MyWishlistTab
          handleTabsChange={mockFn}
          wishlistTabActive={mockBoolean}
          wishlistData={mockWishlistData}
        />
      </Tabs>
    )
    const wishlistTab = screen.getByRole('tab', { name: /my wishlist/i })
    expect(wishlistTab).toBeVisible()
  })

  test('is not selected by default', async () => {
    const SampleTab = () => {
      return <Tab></Tab>
    }
    render(
      <Tabs defaultIndex={0}>
        <SampleTab/>
        <MyWishlistTab
          handleTabsChange={mockFn}
          wishlistTabActive={mockBoolean}
          wishlistData={mockWishlistData}
        />
      </Tabs>
    )
    const wishlistTab = await screen.getByRole('tab', { name: /my wishlist/i })
    screen.debug()
    expect(wishlistTab).toHaveAttribute('aria-selected', 'false')
  })
})