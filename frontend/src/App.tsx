import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HostsProvider } from '@/store/HostsContext'
import { ConfigProvider } from '@/store/ConfigContext'
import { Header } from '@/components/layout/Header'
import { HostsPage } from '@/pages/HostsPage'
import { ConfigPage } from '@/pages/ConfigPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { HostDetailPage } from '@/pages/HostDetailPage'

function App() {
  return (
    <ConfigProvider>
      <HostsProvider>
        <BrowserRouter>
          <Header />
          <main className="mx-auto max-w-6xl px-3 py-4">
            <Routes>
              <Route path="/" element={<HostsPage />} />
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/host/:id" element={<HostDetailPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </HostsProvider>
    </ConfigProvider>
  )
}

export default App
