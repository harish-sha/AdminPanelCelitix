import React from "react";
import Table from "@/ApiDocs/components/Tablenew";
import { useTheme } from "@/ApiDocs/context/ThemeContext";
import { themeColors } from "@/ApiDocs/themeColors";

const GsmErrorCode = () => {
  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);
  return (
    <div
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <div className="flex flex-col justify-center items-center gap-2 popins  ">
          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
            GSM ERROR CODE{" "}
          </h2>

          {/* new table added */}
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Sr.no</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-90">
                    <div className="text-center">Error Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-80">
                    <div className="text-center">Error code</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center">1</Table.Cell>
                  <Table.Cell align="center">Delivered</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    000
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">2</Table.Cell>
                  <Table.Cell align="center">Unknown Subscriber</Table.Cell>
                  <Table.Cell align="center" className="text-orange-500 ">
                    001
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">3</Table.Cell>
                  <Table.Cell align="center">Absent Subscriber</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    002
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">4</Table.Cell>
                  <Table.Cell align="center">Network Issue</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500">
                    003
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">5</Table.Cell>
                  <Table.Cell align="center">Mobile Equipment Error</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    004
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">6</Table.Cell>
                  <Table.Cell align="center">
                    Memory Capacity Exceeded
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    005
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">7</Table.Cell>
                  <Table.Cell align="center">Call Barring</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    006
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">8</Table.Cell>
                  <Table.Cell align="center">DND</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    007
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">9</Table.Cell>
                  <Table.Cell align="center">Blacklisted Sender ID</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    008
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">10</Table.Cell>
                  <Table.Cell align="center">Spam Content</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    009
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">11</Table.Cell>
                  <Table.Cell align="center">Misc. Error</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    010
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">12</Table.Cell>
                  <Table.Cell align="center">Blacklisted Number</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    011
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">13</Table.Cell>
                  <Table.Cell align="center">Illegal Subscriber</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    012
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">14</Table.Cell>
                  <Table.Cell align="center">Timeout</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    013
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">15</Table.Cell>
                  <Table.Cell align="center">
                    Teleservices Not Provisioned
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    014
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">16</Table.Cell>
                  <Table.Cell align="center">
                    Unidentified Subscriber
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    015
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">17</Table.Cell>
                  <Table.Cell align="center">Facility Not Supported</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    016
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">18</Table.Cell>
                  <Table.Cell align="center">
                    SMS Not Supported by MS
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    017
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">19</Table.Cell>
                  <Table.Cell align="center">Invalid Subscriber</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    018
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">20</Table.Cell>
                  <Table.Cell align="center">System Failure</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    019
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">21</Table.Cell>
                  <Table.Cell align="center">Message Expired</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    020
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">22</Table.Cell>
                  <Table.Cell align="center">Subscriber Busy</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    021
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">23</Table.Cell>
                  <Table.Cell align="center">Text Flooding</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    022
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">24</Table.Cell>
                  <Table.Cell align="center">SM Delivery Failure</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    032
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">25</Table.Cell>
                  <Table.Cell align="center">DLT Scrubbing Timeout</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    400
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">26</Table.Cell>
                  <Table.Cell align="center">DLT Misc. Error</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    411
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">27</Table.Cell>
                  <Table.Cell align="center">Unknown Error</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    444
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">28</Table.Cell>
                  <Table.Cell align="center">Entity Not Found</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    800
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">29</Table.Cell>
                  <Table.Cell align="center">Entity Not Registered</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    801
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">30</Table.Cell>
                  <Table.Cell align="center">Entity Inactive</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    802
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">31</Table.Cell>
                  <Table.Cell align="center">Entity Blacklisted</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    803
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">32</Table.Cell>
                  <Table.Cell align="center">Invalid Entity ID</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    804
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">33</Table.Cell>
                  <Table.Cell align="center">
                    Entity ID Not Allowed from TM
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    805
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">34</Table.Cell>
                  <Table.Cell align="center">Header Not Found</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    820
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">35</Table.Cell>
                  <Table.Cell align="center">Header Inactive</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    821
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">36</Table.Cell>
                  <Table.Cell align="center">Header Blacklisted</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    822
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">37</Table.Cell>
                  <Table.Cell align="center">
                    EntityID Not Matched With Header
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    823
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">38</Table.Cell>
                  <Table.Cell align="center">
                    Header Permanently Suspended - NonUsage
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    825
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">39</Table.Cell>
                  <Table.Cell align="center">
                    Header Temporary Suspension - Validity
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    826
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">40</Table.Cell>
                  <Table.Cell align="center">Template ID Not Found</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    830
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">41</Table.Cell>
                  <Table.Cell align="center">Template Inactive</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    831
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">42</Table.Cell>
                  <Table.Cell align="center">Template Blacklisted</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    832
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">43</Table.Cell>
                  <Table.Cell align="center">Template Not Matched</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    833
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">44</Table.Cell>
                  <Table.Cell align="center">
                    Header Not Registered For Template
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    834
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">45</Table.Cell>
                  <Table.Cell align="center">
                    Variable Length Exceeded
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    835
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">46</Table.Cell>
                  <Table.Cell align="center">
                    Error Identifying Template
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    836
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">47</Table.Cell>
                  <Table.Cell align="center">Blank Template ID</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    837
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">48</Table.Cell>
                  <Table.Cell align="center">
                    Template Not Registered for Entity
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    838
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">49</Table.Cell>
                  <Table.Cell align="center">Unverified Template</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    839
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">49</Table.Cell>
                  <Table.Cell align="center">Unverified Template</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    839
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">50</Table.Cell>
                  <Table.Cell align="center">
                    Template Suspended by Entity
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    840
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">51</Table.Cell>
                  <Table.Cell align="center">
                    Header Permanently Suspended - Unverified
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    841
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">52</Table.Cell>
                  <Table.Cell align="center">Preference Not Matched</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    850
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">53</Table.Cell>
                  <Table.Cell align="center">Invalid Promo Time</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    851
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">54</Table.Cell>
                  <Table.Cell align="center">SE Category Blockin</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    852
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">55</Table.Cell>
                  <Table.Cell align="center">Consent Failed</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    860
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center">56</Table.Cell>
                  <Table.Cell align="center">Scrubbing Failed</Table.Cell>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    870
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          {/* new table added */}
        </div>
      </div>
    </div>
  );
};

export default GsmErrorCode;
