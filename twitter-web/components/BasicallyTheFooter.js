import SearchIcon from '@mui/icons-material/Search';

export default function BasicallyTheFooter() {
    return (
        <div className="border-l border-l-twitter-border w-[400px] pl-8 pr-6 min-h-screen text-twitter-gray">
          <div className="flex h-[45px] bg-twitter-border rounded-full justify-left items-center mt-1">
            <SearchIcon className="ml-5 mr-3" />
            Search Twitter
          </div>
        </div>
    );
}