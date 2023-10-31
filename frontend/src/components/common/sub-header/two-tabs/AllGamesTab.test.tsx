import { render, screen } from "../../../../test/test-utils";
import { AllGamesTab } from "./AllGamesTab";
import { vi } from "vitest";
import { Tabs } from "@chakra-ui/react";

describe('AllGamesTab component', () => {
  const mockFn = vi.fn()
  const mockBoolean = true

  test('renders', () => {
    render(
      <Tabs>
        <AllGamesTab
          handleTabsChange={mockFn}
          gamesTabActive={mockBoolean}
        />
      </Tabs>
    )
    const gamesTab = screen.getByRole('tab', { name: 'All Games' })
    expect(gamesTab).toBeVisible()
  })

  test('is selected by default', () => {
    render(
      <Tabs>
        <AllGamesTab
          handleTabsChange={mockFn}
          gamesTabActive={mockBoolean}
        />
      </Tabs>
    )
    const gamesTab = screen.getByRole('tab', { name: 'All Games' })
    expect(gamesTab).toHaveAttribute('aria-selected', 'true')
  })
})