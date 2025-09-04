export default function BannersLoading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-white rounded-lg border">
                <div className="px-6 py-4 border-b">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="divide-y">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="px-6 py-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-1 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}