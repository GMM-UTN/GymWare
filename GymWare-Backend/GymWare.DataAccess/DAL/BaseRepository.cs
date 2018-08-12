using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.DataAccess.DAL
{
    public class BaseRepository
    {
        internal GymWareContext _db = new GymWareContext();
    }
}
