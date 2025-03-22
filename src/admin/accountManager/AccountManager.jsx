import React, { useState } from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import AccountManagerTable from './components/AccountManagerTable';


const AccountManager = () => {
    const [isFetching, setIsFetching] = useState(false);

  return (
    <div className='w-full'>
    {/* {isLoading ? (
    <>
      <Loader />
    </>
  ) : ( */}
    <div>

      <div className="flex flex-wrap gap-2 items-end justify-end pb-3 w-full">
        <div className="w-max-content">
          <UniversalButton
            label="Add Account"
            id="addaccountCreate"
          />
        </div>
      </div>

      {/* ✅ Show Loader or Table */}
      {isFetching ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <div className="w-full">
          <AccountManagerTable
           id="accountManagerTable"
           name="accountManagerTable"
          />
        </div>
      )}

      
    </div>

    {/* )} */}
  </div>
  )
}

export default AccountManager
