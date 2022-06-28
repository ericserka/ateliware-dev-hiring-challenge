import {
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LANGS } from "../../../assets/langs"
import { ApiResponse, fetchRepositories } from "../../../services/api"
import { Repository } from "../../repository/Repository"
import { RepositoryCard } from "../../repository/RepositoryCard"

export const TabsPanel = () => {
  const [language, setLanguage] = useState<string>(LANGS[0].value)
  const [seeMoreLoading, setSeeMoreLoading] = useState<boolean>(false)
  const [seeMore, setSeeMore] = useState<boolean>(true)
  const [totalRepos, setTotalRepos] = useState<number>(0)
  const [repos, setRepos] = useState<ApiResponse>({ total_count: 0, items: [] })
  const [page, setPage] = useState<number>(1)
  const toast = useToast()

  const getRepositories = async () => {
    const data = await fetchRepositories({ language, page })
    if (!data.items.length) {
      toast({
        title: "Failed to fetch",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      setTotalRepos(data.total_count)
      setRepos(
        page > 1 ? { ...data, items: repos.items.concat(data.items) } : data,
      )
    }
    setSeeMoreLoading(false)
  }

  useEffect(() => {
    getRepositories()
  }, [language, page])

  useEffect(() => {
    if (repos.items.length >= totalRepos) {
      setSeeMore(false)
    }
  }, [repos])

  useEffect(() => {
    console.log({ language })
  }, [language])

  const handleSeeMoreClick = () => {
    setSeeMoreLoading(true)
    setPage(page + 1)
  }

  const onChangeTab = (index: number) => {
    setPage(1)
    setLanguage(LANGS[index].value)
  }

  return (
    <Tabs isFitted variant='enclosed-colored' isLazy onChange={onChangeTab}>
      <TabList mb='1em'>
        {LANGS.map((lang) => (
          <Tab key={lang.value} _selected={{ color: lang.color, bg: lang.bg }}>
            {lang.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {repos.items.length > 0 ? (
          Array(LANGS.length)
            .fill(null)
            .map((_, index) => (
              <TabPanel key={LANGS[index].value}>
                <SimpleGrid columns={[1, 2]} spacingX='40px' spacingY='20px'>
                  {repos.items.map((repository: Repository) => (
                    <GridItem key={repository.id}>
                      <RepositoryCard repository={repository} />
                    </GridItem>
                  ))}
                </SimpleGrid>
                {seeMore && (
                  <Flex align='center' justify='center' marginTop={5}>
                    <Button
                      onClick={handleSeeMoreClick}
                      colorScheme='orange'
                      variant='outline'
                      disabled={seeMoreLoading}
                    >
                      {seeMoreLoading ? <Spinner size='md' /> : "Ver mais"}
                    </Button>
                  </Flex>
                )}
              </TabPanel>
            ))
        ) : (
          <Flex align='center' justify='center'>
            <Spinner size='xl' />
          </Flex>
        )}
      </TabPanels>
    </Tabs>
  )
}
