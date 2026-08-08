import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AttributionCard() {
  return (
    <Card className="border-sky-200">
      <CardHeader>
        <CardTitle>License and Attribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-600">
        <p>myNetwork is maintained by Vesa Raul Bogdan.</p>
        <p>
          Based on the original MIT-licensed WatchYourLAN project by{' '}
          <a
            href="https://github.com/aceberg/WatchYourLAN"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 hover:underline"
          >
            aceberg
          </a>
          . Original copyright notice is preserved in the project license.
        </p>
      </CardContent>
    </Card>
  )
}
